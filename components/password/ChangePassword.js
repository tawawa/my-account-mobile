import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { passwordChanged, changePassword, cleanup } from '../../actions/password';
import { Card, CardSection, Input, Button, Spinner, ImageView } from '../common';
import params from '../../auth0-params.json';

class ChangePassword extends Component {

  componentWillMount() {
    this.props.cleanup();
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { password, idToken, accessToken, originAccessToken } = this.props;
    this.props.changePassword({ password, idToken, accessToken, originAccessToken });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Change
      </Button>
    );
  }

  render() {
    return (
      <View>
        <Card style={{ borderWidth: 0 }}>
          <CardSection style={{ backgroundColor: '#222228',  borderColor: '#222228' }}>
            <ImageView />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
        </CardSection>

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <Text style={styles.messageTextStyle}>
            {this.props.message}
          </Text>

          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'red'
  },
  messageTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'green'
  }
};

const mapStateToProps = (state) => {
  const { password, error, loading, message } = state.password;
  const { idToken, accessToken, originAccessToken } = state.auth;
  return { password, error, loading, message, idToken, accessToken, originAccessToken };
};

export default connect(mapStateToProps, {
  passwordChanged, changePassword, cleanup
})(ChangePassword);
