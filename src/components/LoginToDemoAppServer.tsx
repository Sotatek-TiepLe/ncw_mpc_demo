import React from "react";
import { useAppStore } from "../AppStore";
import { loadPrivateKey } from "../keyWallet";
import { IActionButtonProps } from "./ui/ActionButton";
import { Card } from "./ui/Card";

export const LoginToDemoAppServer: React.FC = () => {
  const {
    userId,
    loginToDemoAppServerStatus,
    askToJoinWalletExisting,
    initFireblocksNCW,
    automateInitialization,
    loginToDemoAppServer,
    setDeviceId,
    setWalletId,
    deviceId,
    walletId,
    recoverKeys,
    setupStatus,
    setSetupStatus,
  } = useAppStore();

  const joinWalletExisting = async () => {
    setSetupStatus("starting");

    // Step 1: call api login
    await loginToDemoAppServer();

    // Step 2: join wallet existing
    // setDeviceId("c1045028-46e9-4d13-819c-71f79574cc32"), setWalletId("c6c5457a-a8e4-420f-a99a-de8a9961037a");
    // Step 2.2: call api apiService.askToJoinWalletExisting(deviceId, walletId);
    await askToJoinWalletExisting();

    // Step 3: await FireblocksNCWFactory
    await initFireblocksNCW();

    // Step 4:  await fireblocksNCW.recoverKeys
    await recoverKeys(async (pId) => loadPrivateKey(walletId ?? "", pId) ?? "");

    // Done
    setSetupStatus("ready");
  };

  const login: IActionButtonProps = {
    action: loginToDemoAppServer,
    isDisabled: loginToDemoAppServerStatus === "started" || !!userId,
    isInProgress: loginToDemoAppServerStatus === "started",
    label: "Login",
  };

  const joinWallet: IActionButtonProps = {
    action: joinWalletExisting,
    isDisabled: setupStatus === "ready",
    isInProgress: setupStatus === "starting",
    label: "Join wallet",
  };

  return (
    <Card title="Login" actions={[login, joinWallet]}>
      {userId && <h1>User ID: {userId}</h1>}
      {deviceId && walletId && (
        <>
          <h1>Device ID: {deviceId}</h1>
          <h1>Wallet ID: {walletId}</h1>
        </>
      )}
      {loginToDemoAppServerStatus === "failed" && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Unable to Login to Demo App Server</span>
          </div>
        </div>
      )}
    </Card>
  );
};
