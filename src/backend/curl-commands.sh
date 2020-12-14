# Get list of images from database
curl -s http://localhost:4000/api | jq
# Upload image
curl -F 'profileImg=@avatar.jpg' http://localhost:4000/api/user-profile
