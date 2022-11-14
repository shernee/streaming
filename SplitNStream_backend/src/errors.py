class Error(Exception):
    def __init__(self, value=""):
        if not hasattr(self, "value"):
            self.value = value

    def __str__(self):
        return repr(self.value)


#############################
# 10. Authentication Errors #
#############################
class UsernameConflictError(Error):
    message = "Your username is already in use"
    internal_error_code = 1040101  #classoferror-httpcode-SNo

class EmailConflictError(Error):
    message = "Your email is already in use"
    internal_error_code = 1040102

#############################
# 15. Group View Errors #
#############################

class SubscriptionIdDoesNotExist(Error):
    message = "Subscription id does not exist"
    internal_error_code = 1540101

class GroupIdDoesNotExist(Error):
    message = "Group id does ot exist"
    internal_error_code = 1540102

class GroupNotInFormationStage(Error):
    message = "The Group is not in the FORMATION Stage"
    internal_error_code = 1540103

class UserMembershipExistsForGroup(Error):
    message = "User is already a group member"
    internal_error_code = 1540104

class GroupMemberLimitExceeded(Error):
    message = "Number of group members has exceeded the limit"
    internal_error_code = 1540105
