import SealdSDK from "@seald-io/sdk";

import SealdSDKPluginSSKS2MR from "@seald-io/sdk-plugin-ssks-2mr";
import SealdSDKPluginSSKSPassword from "@seald-io/sdk-plugin-ssks-password";

import Cookies from "js-cookie"; // Read Cookies uing Cookies.get("cookieName")
let sealdSDKInstance = null;

const instantiateSealdSDK = async ({ databaseKey, sessionID }) => {
  console.log(databaseKey, sessionID);

  console.log(process.env.REACT_APP_seald_apiURL);
  console.log(process.env.REACT_APP_ssks_key_storage_url);
  sealdSDKInstance = SealdSDK({
    appId: Cookies.get("appId"),
    databaseKey: databaseKey, //Generated on the Server
    databasePath: `seald-seacure-message-hub-${sessionID}`,
    plugins: [SealdSDKPluginSSKS2MR(), SealdSDKPluginSSKSPassword()],
  });
  await sealdSDKInstance.initialize(); // Initialize the SealdSdk
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
  userLicenseToken,
  databaseKey,
  sessionID,
  jwt,
}) => {
  await instantiateSealdSDK({ databaseKey, sessionID });
  await sealdSDKInstance.initiateIdentity({ userId, userLicenseToken });
  // await sealdSDKInstance.ssksPassword.saveIdentity({ userId, password });
};

export const saveIdentity = async ({
  userId,
  twoManRuleKey,
  emailAddress,
  twoManRuleSessionId,
  challenge = false,
  databaseKey,
  sessionID,
}) => {
  await instantiateSealdSDK({ databaseKey, sessionID });
  console.log(twoManRuleSessionId);
  if (!challenge) {
    await sealdSDKInstance.ssks2MR.saveIdentity({
      authFactor: {
        type: "EM",
        value: emailAddress,
      },
      twoManRuleKey,
      userId,
      sessionId: twoManRuleSessionId,
    });
  } else {
    await sealdSDKInstance.ssks2MR.saveIdentity({
      challenge,
      authFactor: {
        type: "EM",
        value: emailAddress,
      },
      twoManRuleKey,
      userId,
      sessionId: twoManRuleSessionId,
    });
  }
};

export const retrieveIdentity = async ({
  userId,
  databaseKey,
  sessionID,
  emailAddress,
  twoManRuleKey,
  twoManRuleSessionId,
  challenge = null,
  password = false,
}) => {
  console.log(emailAddress);
  console.log(twoManRuleKey);
  await instantiateSealdSDK({ databaseKey, sessionID });
  if (!password) {
    await sealdSDKInstance.ssks2MR.retrieveIdentity({
      challenge,
      authFactor: {
        type: "EM",
        value: emailAddress,
      },
      twoManRuleKey,
      userId,
      sessionId: twoManRuleSessionId,
    });
  } else {
    await sealdSDKInstance.ssksPassword.retrieveIdentity({ userId, password });

    await sealdSDKInstance.ssks2MR.saveIdentity({
      challenge,
      authFactor: {
        type: "EM",
        value: emailAddress,
      },
      twoManRuleKey,
      userId,
      sessionId: twoManRuleSessionId,
    });
  }
};

export const getSealdSDKInstance = () => sealdSDKInstance;
