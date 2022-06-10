import { NextApiRequest, NextApiResponse } from "next"

import { NewsletterFormValues } from "@models/forms"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // reject non-POST requests
  if (req.method !== "POST") {
    res.status(405).end()
    return
  }

  const body: NewsletterFormValues = req.body
  if (!isValidFormBody(body)) {
    res.status(400).end()
  }

  try {
    const response = await fetch(process.env.NEWSLETTER_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.NEWSLETTER_API_TOKEN}`,
      },
      body: JSON.stringify({
        email: body.email,
        lists: [{ hash: process.env.NEWSLETTER_API_LIST_KEY }],
      }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }

  // form has been submitted successfully
  res.status(201).end()
}

function isValidFormBody(data: any): data is NewsletterFormValues {
  return typeof data.email === "string"
}
