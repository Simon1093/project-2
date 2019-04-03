import React from 'react'
import { Redirect } from "react-router";

export default class Home extends React.PureComponent{
  render() {
    return (
      <Redirect to='/news'/>
    )
  }
}
