## Details about 16.Apr Version
This version is modified based on Hanna's version.

### Additions:
1. **Displaying details of each post:** Implemented get details of each post by search postId in the backend. Waiting for the frontend.


===============================================================================

Details about 15.Apr Version

This version is modified based on Hanna's version.

Bug Fixes:
1. **Missing Email in sessionStorage:** Fixed a bug where email information was not stored in sessionStorage after logging in. Users can now verify the stored information using `sessionStorage.getItem("user")` in the browser console.

2. **Displaying User Posts:** Resolved an issue where user-created posts were not visible on the "My Posts" page. Additionally, fixed a bug where clicking on the posts resulted in a perpetual loading state. However, a new bug was introduced where the backend stops running after page refresh. Further investigation is needed to address this issue.

Additions:
1. **Enhanced Password Reset:** Implemented bcrypt encryption in the backend for password reset functionality. Now, when users reset their password, the new password is securely stored in the database using bcrypt encryption.

