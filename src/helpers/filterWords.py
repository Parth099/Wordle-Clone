def isValidWord(s: str) -> bool:
    if not s.isalnum():
        return False
    
    length = len(s)
    if  length < 5 or length > 8:
        return False

    return True


PATH_TO_FILE = "words.txt"
word_list = []

with open(PATH_TO_FILE, "r") as word_list:
    with open("word_list.json", "w") as valid_list:
        valid_list.write("{\n")
        for _word in word_list:
            word = _word.strip()
            if isValidWord(word):
                valid_list.write(f'\t"{word}":"0",\n')

        valid_list.write("}")        

# remove the last comma
print("process complete")