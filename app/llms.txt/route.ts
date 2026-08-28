import { llmsIndex, textResponse } from "../machine-content";

export const dynamic = "force-static";

export function GET() {
  return textResponse(llmsIndex());
}
