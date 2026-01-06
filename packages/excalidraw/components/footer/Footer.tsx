import clsx from "clsx";

import { actionShortcuts } from "../../actions";
import { useTunnels } from "../../context/tunnels";
import { ExitZenModeButton, UndoRedoActions, ZoomActions } from "../Actions";
import { HelpButton } from "../HelpButton";
import { Section } from "../Section";
import Stack from "../Stack";

import { EyeButton } from "../EyeButton";

import { isViewModeActive } from "../../appState";

import type { ActionManager } from "../../actions/manager";
import type { UIAppState } from "../../types";

const Footer = ({
  appState,
  actionManager,
  showExitZenModeBtn,
  renderWelcomeScreen,
  helpEnabled,
  showUndoRedo,
  isTopAligned,
  hideAnnotationsControlEnabled,
  onEyeButtonClick,
}: {
  appState: UIAppState;
  actionManager: ActionManager;
  showExitZenModeBtn: boolean;
  renderWelcomeScreen: boolean;
  helpEnabled?: boolean;
  showUndoRedo: boolean;
  isTopAligned?: boolean;
  hideAnnotationsControlEnabled?: boolean;
  onEyeButtonClick?: () => void;
}) => {
  const { FooterCenterTunnel, WelcomeScreenHelpHintTunnel } = useTunnels();

  return (
    <footer
      role="contentinfo"
      className={clsx("layer-ui__wrapper__footer App-menu App-menu_bottom", {
        "layer-ui__wrapper__footer--top": isTopAligned,
      })}
    >
      <div
        className={clsx("layer-ui__wrapper__footer-left zen-mode-transition", {
          "layer-ui__wrapper__footer-left--transition-left":
            appState.zenModeEnabled,
        })}
      >
        <Stack.Col gap={2}>
          <Section heading="canvasActions">
            <ZoomActions
              renderAction={actionManager.renderAction}
              zoom={appState.zoom}
            />

            {!isViewModeActive(appState) && showUndoRedo && (
              <UndoRedoActions
                renderAction={actionManager.renderAction}
                className={clsx("zen-mode-transition", {
                  "layer-ui__wrapper__footer-left--transition-bottom":
                    appState.zenModeEnabled && !isTopAligned,
                  "layer-ui__wrapper__footer-left--transition-top":
                    appState.zenModeEnabled && isTopAligned,
                })}
              />
            )}
          </Section>
        </Stack.Col>
      </div>
      <FooterCenterTunnel.Out />
      <div
        className={clsx(
          "layer-ui__wrapper__footer-right zen-mode-transition gap-0.5",
          {
            "transition-right": appState.zenModeEnabled,
          },
        )}
      >
        {hideAnnotationsControlEnabled && (
          <EyeButton
            status={appState.hideAnnotations ? "off" : "on"}
            onClick={onEyeButtonClick}
          />
        )}
        <div style={{ position: "relative" }}>
          {renderWelcomeScreen && <WelcomeScreenHelpHintTunnel.Out />}

          {helpEnabled && (
            <HelpButton
              onClick={() => actionManager.executeAction(actionShortcuts)}
            />
          )}
        </div>
      </div>
      <ExitZenModeButton
        actionManager={actionManager}
        showExitZenModeBtn={showExitZenModeBtn}
      />
    </footer>
  );
};

export default Footer;
Footer.displayName = "Footer";
