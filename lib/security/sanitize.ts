/* eslint-disable @typescript-eslint/no-explicit-any */
import sanitizeHtml from "sanitize-html";

export function sanitizeInput(data: any) {

  return {
    ...data,

    title: sanitizeHtml(data.title),

    description: sanitizeHtml(data.description),

    venue: sanitizeHtml(data.venue),

    location: sanitizeHtml(data.location),

    tags: data.tags?.map((tag: string) =>
      sanitizeHtml(tag)
    ),

    agenda: data.agenda?.map((item: string) =>
      sanitizeHtml(item)
    )
  };
}