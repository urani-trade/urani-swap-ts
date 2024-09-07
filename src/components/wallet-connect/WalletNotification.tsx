import type {
  IUnifiedWalletConfig,
  IWalletNotification,
} from "@jup-ag/wallet-adapter/dist/types/contexts/WalletConnectionProvider";
import { notifications } from "@mantine/notifications";

const classNames = {
  title: "font-semibold text-lg", // Custom style for title
  message: "text-sm font-bold text-gray-700", // Custom style for message
};

const WalletNotification: IUnifiedWalletConfig["notificationCallback"] = {


  onConnect: (props: IWalletNotification) => {
    notifications.show({
      title: "Wallet Connected", // Prettier title with emoji
      message: `You are successfully connected to ${props.walletName} (${props.shortAddress})!`,
      color: "#03EDED",
      transition: "fade", // Adds a fade effect
      autoClose: 3000,    // Closes the notification automatically after 5 seconds
      classNames, // No icon property here
    });
  },
  onConnecting: () => {
    return;
  },


  onDisconnect: (props: IWalletNotification) => {
    notifications.show({
      title: `Disconnected from ${props.walletName}`,
      message: `You have been disconnected from wallet ${props.shortAddress}.`,
      color: "#03EDED",
      transition: "fade", // Adds a fade effect
      autoClose: 3000,    // Closes the notification automatically after 5 seconds
      classNames, // No icon property here
    });
  },


  onNotInstalled: (props: IWalletNotification) => {
    notifications.show({
      title: `${props.walletName} Wallet Not Installed`,
      message: (
        <span>
          {`Please visit the `}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500 font-semibold hover:text-blue-600"
            href={props.metadata.url}
          >
            official website
          </a>{" "}
          {`to install the ${props.walletName} wallet.`}
        </span>
      ),
      color: "red", // Highlight this error with red color
      classNames, // No icon property here
    });
  },
};

export default WalletNotification;
