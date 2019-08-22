# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

require 'rest-client'
require 'json'

url = 'https://www.eventbriteapi.com/v3/events/search/?q=America/New_York/'
res = RestClient.get(url, {:Authorization => 'Bearer 64LJGGJXRM6GFCMLLQT5'})
result = JSON.parse(res)


User.destroy_all
Event.destroy_all

u1 = User.create(name: "Jason Left", email: "jleft@gmail.com", password: "password")
u2 = User.create(name: "Jason Right", email: "jright@gmail.com", password: "password")


# puts result


result["events"].each do |something|
    if (something["name"] && something["logo"] && something["description"])
        if (something["name"]["text"] && something["logo"]["url"] && something["description"]["text"])
            puts something
            name = something["name"]["text"]
            img_url = something["logo"]["url"]
            description = something["description"]["text"]
            Event.create(name: name, img_url: img_url, description: description, date: "08/23/2019", start_time: "7pm", end_time: "11pm", address: "123 Main st", city: "Houston", state: "TX", zipcode: 77004, price: 10, lat: (2.3...3.2).rand, long: -187.3, tag: "party", user_id: u1.id)
        end
    end
end

