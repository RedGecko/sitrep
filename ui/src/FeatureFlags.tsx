import { EvaluationContext, OpenFeatureProvider, OpenFeature, InMemoryProvider } from "@openfeature/react-sdk";
import { FliptWebProvider } from "@openfeature/flipt-web-provider";

import { PropsWithChildren, useEffect } from "react";

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
  useEffect(() => {
    const fliptProvider = new FliptWebProvider("sitrep-ui", { url: "https://flipt.sitrep.ch" });
    OpenFeature.setLogger(console);
    OpenFeature.setProvider("local", new InMemoryProvider(localFlagConfig));
    console.log("setting origin", document.location.host);
    OpenFeature.setProvider(fliptProvider, { domain: document.location.host.split(":")[0] });
  }, []);

  return <OpenFeatureProvider>{children}</OpenFeatureProvider>;
};

export { Provider };
