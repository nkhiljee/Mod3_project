# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

require 'rest-client'
require 'pry'
require 'json'

url = 'https://www.eventbriteapi.com/v3/events/search/?q=America/New_York/'
res = RestClient.get(url, {:Authorization => 'Bearer 64LJGGJXRM6GFCMLLQT5'})
result = JSON.parse(res)

u1 = User.create(name: "first last", email: "user1@gmail.com", password: "password")


result['events'].each do |event|
    Events.create(name: , img_url: , description: , )
end



Name
Img_url
Description
Date
Start_time
End_time
Address
City
State
Zipcode
Price
Likes
Tags
