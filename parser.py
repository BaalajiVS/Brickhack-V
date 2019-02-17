import requests
from bs4 import BeautifulSoup
page = requests.get("https://www.enchantedlearning.com/wordlist/food.shtml")

soup = BeautifulSoup(page.content, 'html.parser')
wordlist = []
mydivs = soup.find_all("div", {"class": "wordlist-item"})
for div in mydivs:
    wordlist.append(div.text)
print(wordlist)