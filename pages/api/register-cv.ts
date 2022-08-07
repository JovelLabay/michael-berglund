import { NextApiRequest, NextApiResponse } from "next"

import httpInvenias from "@/lib/utils/http-invenias"
import mapperInvenias from "@/lib/utils/mapper-invenias"
import { RegisterCvValues } from "@models/forms"
import {
    CustomFreeTextField, EmailAddress, HomeAddress, NameComponents, People, PhoneNumber
} from "@models/inveniasModel"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  const auth_token = await httpInvenias.auth().then(data => {
    return data.access_token
  })

  const people: People = mapperInvenias.dataPeopleMapper(req.query)
  const dataQuery = req.query

  if (auth_token) {
    const findDuplicate = await httpInvenias
      .duplicateFinder(people.NameComponents, people.EmailAddresses[0], auth_token)
      .then(data => {
        return data
      })
    let peopleId = null;
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

    let categoryReferences = {
      ItemReferences: [
        { Id: dataQuery["internationellErfarenhet"] },
        { Id: dataQuery["storlekPåLedarskap"] },
        { Id: dataQuery["angeRoll"] },
      ],
    }
    
    const linkToDocuments = await httpInvenias
      .addPeopleCategory(peopleId, categoryReferences, auth_token)
      .then(data => {
        return data
      })

    if (body) {
      const uploadCSV = await httpInvenias
        .uploadDocument(peopleId, body, true, auth_token)
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
        const defaultCSV = await httpInvenias
          .defultCSVDocument(peopleId, findDocumentId, auth_token)
          .then(data => {
            return data
          })
      }
    }
  }

  if (req.method !== "POST") {
    res.status(405).end()
    return
  }

  res.status(201).end()
}

function isValidFormBody(data: any): data is RegisterCvValues {
  return (
    typeof data.firstName === "string" &&
    typeof data.lastName === "string" &&
    typeof data.email === "string" &&
    typeof data.phone === "string" &&
    typeof data.city === "string" &&
    typeof data.coverLetter === "object" &&
    typeof data.newsletter === "boolean" &&
    typeof data.privacyPolicy === "boolean" &&
    typeof data.angeRoll === "string" &&
    typeof data.storlekPåLedarskap === "string" &&
    typeof data.internationellErfarenhet === "string" &&
    typeof data.budgetResponsibility === "string" &&
    typeof data.language === "string" &&
    typeof data.compensation === "string" &&
    typeof data.industry === "string" &&
    typeof data.availability === "string" &&
    typeof data.cvFile === "object" &&
    typeof data.linkedIn === "string"
  )
}
