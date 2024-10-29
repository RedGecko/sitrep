import { EvaluationContext, OpenFeatureProvider, OpenFeature, InMemoryProvider } from "@openfeature/react-sdk";
import { FliptWebProvider } from "@openfeature/flipt-web-provider";
import { PropsWithChildren, useEffect, useContext } from "react";

import { UserContext } from "utils";

const localFlagConfig = {
  "new-message": {
    disabled: false,
    variants: {
      on: true,
      off: false,
    },
    defaultVariant: "on",
    contextEvaluator: (context: EvaluationContext) => {
      if (context.silly) {
        return "on";
      }
      return "off";
    },
  },
};

const Provider = (props: PropsWithChildren) => {
  const { children } = props;
  const userState = useContext(UserContext);

  useEffect(() => {
    const fliptProvider = new FliptWebProvider("sitrep-ui", { url: "https://flipt.sitrep.ch" });
    OpenFeature.setProvider("local", new InMemoryProvider(localFlagConfig));
    OpenFeature.setProvider(fliptProvider);
  }, []);

  // sync the evaulation context here, so far only depends on domain and UserContext state
  useEffect(() => {
    const context = {
      domain: document.location.host.split(":")[0],
      email: userState.email,
    };
    OpenFeature.setContext(context);

    return () => {
      console.log("closing openfeature provider");
      OpenFeature.close();
    };
  }, [userState]);

  return <OpenFeatureProvider>{children}</OpenFeatureProvider>;
};

export { Provider };
