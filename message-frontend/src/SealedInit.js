import SealdSDK from "@seald-io/sdk-web";

import SealdSDKPluginSSKSPassword from "@seald-io/sdk-plugin-ssks-password";

const appId = process.env.REACT_APP_seald_appId;
let sealdSDKInstance = null;
const instantiateSealdSDK = async ({ databaseKey, sessionID }) => {
  sealdSDKInstance = SealdSDK({
    appId: appId,
    databaseKey,
    databasePath: `seald-seacure-message-hub-${sessionID}`,
    plugins: [SealdSDKPluginSSKSPassword()],
  });
  await sealdSDKInstance.initialize();
};
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
