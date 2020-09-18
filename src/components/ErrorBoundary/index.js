import React, { Component } from 'react';
import { Loading } from '../Loading';

export const ErrorBoundary = WrappedComponent => {
    class errorBoundary extends Component {
        constructor(props) {
            super(props)
        
            this.state = {
                hasError: false
            }
        }
        componentDidCatch() {  this.setState({hasError: true}) }
        render({ hasError } = this.state) {
            if(hasError) { return <Loading /> }
            
            return (
                <WrappedComponent {...this.props}>
                    {this.props.children}
                </WrappedComponent>
            )
        }
    }
    return errorBoundary
}

export default ErrorBoundary