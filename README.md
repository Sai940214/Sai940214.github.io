# [Details about 15.Apr Version]

# This version is modified based on hanna's version

# Modification:
# Fix bug:
# 1. In login page, email information was missed in sessionStorage. In this version, it has already been fixed.
# You can check the sessionStorage after login. Use "sessionStorage.getItem("user")" in Console section.

# 2. In my posts page, the post created by user can not be seen, and after clicking, the page always show the loading words. In this version, it has already been fixed. But there still has a new bug: after refreshing the page, the backend will stop running.

# Addition:
# 1. Added bcrypt into the reset's backend. Now, when the user reset the password, the new password would be stored into database by bcrypt method.
