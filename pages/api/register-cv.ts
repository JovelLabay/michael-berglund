import fetch from "@adobe/node-fetch-retry"
import Cookies from "cookies"
import FormData from "form-data"
import { createReadStream } from "fs"
import { stat } from "fs/promises"
import multiparty from "multiparty"
import { NextApiRequest, NextApiResponse } from "next"

import httpInvenias from "@/lib/utils/http-invenias"
import mapperInvenias from "@/lib/utils/mapper-invenias"
import { People } from "@models/inveniasModel"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res)
  let auth_token = cookies.get("auth_token")
  if (!auth_token) {
    const auth_token_tmp = await httpInvenias.auth().then(data => {
      return data
    })
    cookies.set("auth_token", auth_token_tmp.access_token, { maxAge: auth_token_tmp.expires_in })
    auth_token = auth_token_tmp.access_token
  }
  if (req.method !== "POST") {
    res.status(405).end()
    return
  }
  const { fields, files } = await parseMultipartForm(req)
  let objectFields: any = {}
  for (const key in fields) {
    if (key != "arrayOptions") {
      objectFields[key] = fields[key][0]
    }
  }

  const people: People = mapperInvenias.dataPeopleMapper(objectFields)

  if (auth_token) {
    const findDuplicate = await httpInvenias
      .duplicateFinder(people.NameComponents, people.EmailAddresses[0], auth_token)
      .then(data => {
        return data
      })
    let peopleId = null
    if (findDuplicate && findDuplicate.length == 0) {
      const newPeople = await httpInvenias
        .addPeople(JSON.stringify(people), auth_token)
        .then(data => {
          return data
        })
      peopleId = newPeople.Id
    } else {
      const [user] = findDuplicate
      peopleId = user.ItemId
      const updatePeople = await httpInvenias
        .updatePeople(peopleId, JSON.stringify(people), auth_token)
        .then(data => {
          return data
        })
    }
    let categoryReferences: any[] = []
    if (fields.arrayOptions && fields.arrayOptions.length) {
      fields.arrayOptions.forEach(data => {
        categoryReferences.push({ Id: data })
      })
    }
    let paramsCategory = {
      ItemReferences: categoryReferences,
    }

    const linkToDocuments = await httpInvenias
      .addPeopleCategory(peopleId, JSON.stringify(paramsCategory), auth_token)
      .then(data => {
        return data
      })

    const filePath = files.file[0].path

    if (filePath) {
      const stats = await stat(filePath)
      const form = new FormData()
      form.append("file", createReadStream(filePath), { knownLength: stats.size })
      const uploadCSV = await httpInvenias
        .uploadDocument(peopleId, form, true, auth_token)
        .then(data => {
          return data
        })
      const isErrorSingleFile = "Message" in uploadCSV
      /** Still there is an issue on file document */
      if (!isErrorSingleFile) {
        const findDocumentId = await httpInvenias
          .findDocumentId(peopleId, uploadCSV.AttachmentName, auth_token)
          .then(data => {
            const [file] = data["Items"]
            return file.ItemId
          })
        const defaultCSV = await httpInvenias.defultCSVDocument(
          peopleId,
          findDocumentId,
          auth_token
        )

        if (defaultCSV.ok) {
          res.status(201).end()
        } else res.status(500).end()
      }
    }
  }

  res.status(201).end()
}

/**
 * Helper method to promisify the parse method of multiparty
 *
 * @param req NextApiRequest
 * @returns the fields and files or error
 */
const parseMultipartForm = (
  req: NextApiRequest
): Promise<{
  fields: Record<string, string[]>
  files: Record<
    string,
    {
      fieldName: string
      originalFilename: string
      path: string
      headers: { "content-disposition": string; "content-type": string }
      size: number
    }[]
  >
}> => {
  const form = new multiparty.Form()
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
