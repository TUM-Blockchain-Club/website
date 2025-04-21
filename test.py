import requests

STRAPI_URL = "https://strapi.rbg.tum-blockchain.com/api/Members"
API_TOKEN = "17abc82c4e3b411bfcf877526299447a66eed7e72105c4f7dacb7581580e1a0dd9a4ed1dc95e43614f9b0d198e5aab55c9a90097e30119f9a7aec10322c8c4a76fa5f3c54021baa5cd27c25adc945c6d8caa4d7383b72f507fcf5c90ea96b9aab4ea92cfc9da76678c71204cc6f0282186de964fcd904f98d51d2228c50db7c0"


curl -H "Authorization: Bearer 28663b7d1718240d3f6c3f9b6dde044a212fc360bd1e78c678cb2b9ccbf011b7f401c2cef8724dec9bcb22122ff94df994396b36dc3901bfd9486d01f3294b9489054dfaf0ddce0559ea4975ac135d7be1bf98f0467e47bde45ed7242a23373377f24ffa368e096187f5106667459ab47dc4f828797cdfa636955c4905095968" \
"https://strapi.rbg.tum-blockchain.com/api/Members?populate=*"

headers = {
    "Authorization": f"Bearer {API_TOKEN}"
}

response = requests.get(STRAPI_URL, headers=headers)

print(response)

if response.status_code == 200:
    data = response.json()
    print(data)
    for member in data["data"]:
        name = member["attributes"]["name"]
        role = member["attributes"]["role"]
        image_url = member["attributes"]["photo"]["data"]["attributes"]["url"]
        print(f"{name} - {role} - {image_url}")
else:
    print(f"Failed to fetch data: {response.status_code}")
    print(response.text)