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