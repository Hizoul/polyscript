import * as React from "react"
import { ListItem, ListItemProps } from "react-native-elements"

export interface IListItemLinkProps extends ListItemProps {
  title: string
  link: string
  navigation?: any
  rightIcon?: any
}
const ListItemLink: React.FunctionComponent<IListItemLinkProps> = (props) => {
  return (
    <ListItem
      {...props}
      title={props.title}
      rightIcon={props.rightIcon ? props.rightIcon : {name: "chevron-right"}}
      onPress={() => {
        props.navigation.navigate(props.link)
      }}
    />
  )
}
export default ListItemLink
