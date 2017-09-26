# Applozic Sidebox React Component For Meteor

Renders the sidebox ui outside react dom so not to cause invariant issues.

Just place ```<Sidebox/>``` in your code.

### Available props
- videoEnabled (default false) - set to true if you want to include video chat javascript files
- initOptions - options to pass to into applogic login method ($applogic.fn.applogic()), otherwise you have to manually call $applogic.fn.applogic() somewhere else in your code. this is done in componentDidMount since it's client side and to make sure all JS files have been loaded.
