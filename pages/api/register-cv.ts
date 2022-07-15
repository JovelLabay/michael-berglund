import { NextApiRequest, NextApiResponse } from "next"
import { type } from "os"

import { RegisterCvValues } from "@models/forms"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end()
    return
  }

  const body = req.body

  //   if (!isValidFormBody(body)) {
  //     res.status(400).end()
  //   }

  console.log({ body })

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
