import * as React from "react"

interface ConditionProps {
  readonly condition: boolean
}

export const If: React.FC<React.PropsWithChildren<ConditionProps>> = (props) => {
  if (props.condition) {
    return <>{props.children}</>
  } else {
    return <></>
  }
}
