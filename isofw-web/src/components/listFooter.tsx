import * as React from "react"
import WebButton from "./button"
import I18n from "./i18n"

const ListFooter: React.FunctionComponent<{
  listHelper: any,
  createLink: string
}> = (props) => {
  const listHelper = props.listHelper
  return (
    <div className="data-table-footer">
      <WebButton
        text="Create"
        iconFa="plus"
        fill={true}
        href={props.createLink}
        style={{margin: "0.5rem"}}
      />
      <div className="data-table-pagination">
        <span className="data-table-pagination-label"><I18n text="page" /> {listHelper.currentPage + 1} / {listHelper.maxPage}</span>
        <a onClick={listHelper.prevPage} className={"link" + (listHelper.showPrevPage ? "" : " disabled")}>
          <i className="icon icon-prev color-gray"></i>
        </a>
        <a onClick={listHelper.nextPage} className={"link" + (listHelper.showNextPage ? "" : " disabled")}>
          <i className="icon icon-next color-gray"></i>
        </a>
      </div>
    </div>
  )
}

export default ListFooter
