import { createHmac } from "crypto";

export const hashPassword = (targetData: string): string => {
  if (targetData.length > 0) {
    return createHmac("sha256", process.env.HASH_KEY!)
      .update(targetData)
      .digest("hex");
  } else {
    return "";
  }
};
