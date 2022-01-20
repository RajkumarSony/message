import SealdSDK from "@seald-io/sdk-web";

import SealdSDKPluginSSKSPassword from "@seald-io/sdk-plugin-ssks-password";
import Cookies from "js-cookie"; // Read Cookies uing Cookies.get("cookieName")

let sealdSDKInstance = null;
/**
 * @param {string} databaseKey -database Key generated on the server is random key generated and send by the server
 * @param {string} sessionID - This is Unique id used by server to identify Conntected session uniquely server assing every session a unique id
 */
const instantiateSealdSDK = async ({ databaseKey, sessionID }) => {
  sealdSDKInstance = SealdSDK({
    appId: Cookies.get("appId"),
    databaseKey, //Generated on the Server 
    databasePath: `seald-seacure-message-hub-${sessionID}`, 
    plugins: [SealdSDKPluginSSKSPassword()],
  });
  await sealdSDKInstance.initialize(); // Initialize the SealdSdk
};
// Retrive app
/**
 * @param {string} databaseKey -database Key generated on the server is random key generated and send by the server
 * @param {string} sessionID - This is Unique id used by server to identify Conntected session uniquely server assing every session a unique id
 */
export const retrieveIdentityFromLocalStorage = async ({
  databaseKey,
  sessionID,
}) => {
  await instantiateSealdSDK({ databaseKey, sessionID });
  const status = await sealdSDKInstance.registrationStatus();
  if (status !== "registered") {
    throw new Error("Not registered");
  }
};
/**
 * @param {string} databaseKey -database Key generated on the server is random key generated and send by the server
 * @param {string} sessionID - This is Unique id used by server to identify Conntected session uniquely server assing every session a unique id
 * @param {string} userId - This is a string assigned to user to idetify them uniquely.
 * @param {string} userLicenseToken - This is unique LicenseToken generated on server unique to every userId generated using userid and appID, validationKey & validationKeyId. 
 * @param {string} password - This is a alpha-numeric string choosen by the user 
 */
export const createIdentity = async ({
  userId,
  password,
  userLicenseToken,
  databaseKey,
  sessionID,
}) => {
  await instantiateSealdSDK({ databaseKey, sessionID });
  await sealdSDKInstance.initiateIdentity({ userId, userLicenseToken });
  await sealdSDKInstance.ssksPassword.saveIdentity({ userId, password });
};
/**
 * @param {string} databaseKey -database Key generated on the server is random key generated and send by the server
 * @param {string} sessionID - This is Unique id used by server to identify Conntected session uniquely server assing every session a unique id
 * @param {string} userId - This is a string assigned to user to idetify them uniquely.
 * @param {string} password - This is a alpha-numeric string choosen by the user 
 */
export const retrieveIdentity = async ({
  userId,
  password,
  databaseKey,
  sessionID,
}) => {
  await instantiateSealdSDK({ databaseKey, sessionID });
  await sealdSDKInstance.ssksPassword.retrieveIdentity({ userId, password });
};
export const getSealdSDKInstance = () => sealdSDKInstance;
