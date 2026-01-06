import clsx from "clsx";

import { useTunnels } from "../../context/tunnels";
import { useUIAppState } from "../../context/ui-appState";
import { useAppProps } from "../App";

import "./FooterCenter.scss";

const FooterCenter = ({ children }: { children?: React.ReactNode }) => {
  const { FooterCenterTunnel } = useTunnels();
  const appState = useUIAppState();
  const appProps = useAppProps();
  const isTopAligned = !!appProps.UIOptions?.swapTopMenuAndFooter;

  return (
    <FooterCenterTunnel.In>
      <div
        className={clsx("footer-center zen-mode-transition", {
          "layer-ui__wrapper__footer-left--transition-bottom":
            appState.zenModeEnabled && !isTopAligned,
          "layer-ui__wrapper__footer-left--transition-top":
            appState.zenModeEnabled && isTopAligned,
        })}
      >
        {children}
      </div>
    </FooterCenterTunnel.In>
  );
};

export default FooterCenter;
FooterCenter.displayName = "FooterCenter";
