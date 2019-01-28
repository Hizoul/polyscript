import * as React from "react"
import { ListItem, ListItemProps } from "react-native-elements"

export interface IListItemLinkProps extends ListItemProps {
  title: string
  link: string
  navigation?: any
}
const ListItemLink: React.FunctionComponent<IListItemLinkProps> = (props) => {
  return (
    <ListItem
      {...props}
      title={props.title}
      onPress={() => {
        props.navigation.navigate(props.link)
      }}
    />
  )
} 
export default ListItemLink