import React from "react";

import { useAppStore } from "../AppStore";
import { AssignDevice } from "./AssignDevice";
import { FireblocksNCWInitializer } from "./FireblocksNCWInitializer";
import { LoginToDemoAppServer } from "./LoginToDemoAppServer";
import { FireblocksNCWExampleActions } from "./FireblocksNCWExampleActions";
import { ModeSelector } from "./ModeSelector";

export const AppContent: React.FC = () => {
  const {
    loginToDemoAppServerStatus,
    assignDeviceStatus,
    appStoreInitialized,
    fireblocksNCWStatus,
    initAppStore,
    disposeAppStore,
    appMode,
    setupStatus
  } = useAppStore();

  React.useEffect(() => {
    if (appStoreInitialized) {
      return () => {
        disposeAppStore();
      };
    } else {
      initAppStore();
    }
  }, [disposeAppStore, appStoreInitialized]);

  if (!appStoreInitialized) {
    return null;
  }

  return (
    <>
      <LoginToDemoAppServer />
      {(loginToDemoAppServerStatus === "success" && setupStatus === 'not_ready') && (
        <>
          {/* <ModeSelector /> */}
          {appMode && (
            <>
              <AssignDevice />
              {assignDeviceStatus === "success" && (
                <>
                  <FireblocksNCWInitializer />
                </>
              )}
            </>
          )}
        </>
      )}
        {(fireblocksNCWStatus === "sdk_available" || setupStatus === "ready") && <FireblocksNCWExampleActions />}
    </>
  );
};
