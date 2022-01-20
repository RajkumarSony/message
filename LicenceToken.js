const crypto = require("crypto"); // Inbuild lib of nodejs for generating hash and keys.
const { promisify } = require("util"); // Inbuild nodejs utility library import's promisify
const dotenv = require("dotenv"); // read the env variables
dotenv.config();
const randomBytes = promisify(crypto.randomBytes);
const scrypt = promisify(crypto.scrypt);

// Function to generate LicenseToken using userId generates unike Token every time whenever it is called

/**
 * @param {string} userId - userId is Unique UserId which is used to identify user uniquely on the application .
 */
const generateUserLicenseToken = async (userId) => {
  const appId = process.env.seald_appId;
  const validationKeyId = process.env.seald_validationKeyId;
  const validationKey = process.env.seald_validationKey;
  // Gnerates a random string of 64 cahraters in hex code
  const nonce = (await randomBytes(32)).toString("hex"); // 32 bytes encoded in hex is 64 chars
  const token = (
    await scrypt(
      Buffer.from(`${userId}@${appId}-${validationKey}`, "utf8"),
      Buffer.from(nonce, "utf8"),
      64,
      { N: 16384, r: 8, p: 1 }
    )
  ).toString("hex");
  return new Promise((resolve, reject) => {
    if (
      appId !== undefined &&
      validationKey !== undefined &&
      validationKeyId !== undefined &&
      nonce !== undefined &&
      token !== undefined &&
      userId !== undefined
    ) {
      resolve(`${validationKeyId}:${nonce}:${token}`);
    } else {
      reject("A parameter is not provided");
    }
  });
};

// Exprots the generateUserLienseToken function to be assible by other code.
module.exports = generateUserLicenseToken;
