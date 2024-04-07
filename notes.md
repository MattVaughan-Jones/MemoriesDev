### Setting up AWS CLI access. I think I was successful here.
based on these instructions and others: https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html

run $ aws configure sso
   enter the following information as prompted:
SSO session name (Recommended): my-sso
SSO start URL [None]: https://d-976759534c.awsapps.com/start
SSO region [None]: ap-southeast-2
SSO registration scopes [None]: sso:account:access #not sure what this is or if it's correct...

to use that profile, all commands need to end with --profile admin

to log in with that admin profile: 
$ aws sso login --profile my-dev-profile

run `aws configure` to enter access key id and secretAccessKey

It looks like mattvj97user1 (created in IAM - not IAM identity centre) is the profile that I'm loggin into through the terminal.
For some reason I'm not accessing the IAM Identity Center user. Not sure how this works yet.