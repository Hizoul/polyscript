import { IFormAuthProps, SharedFormAuth } from "isofw-shared/src/util/xpfwuishared"
import urls from "isofw-shared/src/globals/url"
import * as React from "react"
import { View } from "react-native";
import ListItemLink from "./listItemLink";

const MenuPanel: React.FunctionComponent<IFormAuthProps> = (props) => {
  return (
    <View>
        <ListItemLink
          {...props}
          link="/"
          title="Home"
          leftIcon={{name: "home"}}
        >
        
        </ListItemLink>
        {props.loggedIn ? [
          <ListItemLink
            link={urls.projectOverview}
            title="Projects"
            key="Projects"
          >
          
          </ListItemLink>,
          <ListItemLink
            link={urls.cameraOverview}
            title="Cameras"
            key="Cameras"
          >
          
          </ListItemLink>,
          <ListItemLink
            link="/login"
            title="Logout"
            key="Logout"
          >
          
          </ListItemLink>
        ] : (
          <ListItemLink
            link="/login"
            title="Login"
            {...props}
          >
          
          </ListItemLink>
        )}
    </View>
  )
}

const Menu: any = SharedFormAuth<{}>(MenuPanel)
export default Menu