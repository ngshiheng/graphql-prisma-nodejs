import * as React from 'react';
import { Button, TextField } from '@material-ui/core';

export class Register extends React.PureComponent {
    state = {
        email: '',
        password: '',
    };

    handleChange = (event: any) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        const { password, email } = this.state;
        return (
            <form>
                <div>
                    <TextField
                        type="email"
                        name="email" // Note: name has to match state
                        placeholder="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <TextField
                        // type="password"
                        name="password" // Note: name has to match state
                        placeholder="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                </div>
                <Button onClick={() => console.log('hi')}>Register</Button>
            </form>
        );
    }
}
