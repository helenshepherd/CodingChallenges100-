# Exercise 1
# function that takes in the numerator and denominator of a fraction, reduces the fraction to its lowest possible terms,
# and returns the numerator and denominator of the new fraction
def reduceFraction(num, den):
    #find highest common denominator using math.gcd
    import math
    highest_denom = math.gcd(num,den)
    #divide each number by highest denominator to create new fraction, converting to integers to remove float numbers
    return (int(num/highest_denom),int(den/highest_denom))

# Exercise 2
# function that checks if a date is 'magic' ie if the day * month = last two digits of the year
def isMagicDate(day, month, year):
    #grab last two digits of the year
    last_two_year = int(str(year)[-2:])
    #check if day * month is equal to last_two_year
    if (day*month) == last_two_year:
        return True
    return False

# Exercise 3
#function that takes in a list and returns a list of all possible sublists
def sublist(l):
    #create new list for sublists, including blank sublist
    sublists = [[]]
    #for each item in l, append that item plus each sublist beginning with it to the list of sublists
    for index in range(len(l)):
        #append from the current index position to the index position + a length that starts at 1 and increases until the end of the list
        for length in range(1,(len(l)+1-index)):
            sublists.append(l[index:index+length])
    return sublists

# Exercise 4
#function that takes in a word and returns the pigLatin form of the word
def pigLatin(word):
    #set up strings to use as checks for consonants, vowels and punctuation
    consonants = "bcdfghjklmnpqrstvwxyz"
    vowels = "aeiou"
    punctuation = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~\\"
    #check whether the word begins with an Upper Case letter
    check_upper = word[0].isupper()
    #reverse the string and check for punctuation at the end
    rev = word[::-1]
    punc_rev = ''
    for char in rev:
        if char in punctuation:
            punc_rev += char
            word = word[:-1]
        else:
            break
    #reverse selected punctuation back to original text direction
    punc = punc_rev[::-1]
    #if the word begins with a vowel, add 'way' to end + any original punctuation        
    if word[0].lower() in vowels:
            return word +'way'+punc
    
    else:
        #if the word begins with a consonant, grab the start of the word up til the first vowel, add this into 'initial_str'
        initial_str = ''
        for letter in word:
            if letter.lower() in consonants:
                initial_str += letter
                word = word[1:]
            else:
                break
        #if the word began with a capital, capitalise the new first letter
        if check_upper==True:
            return (word+initial_str+'ay'+punc).capitalize()
        #if the word began with a lower case letter, return the word as lower case
        else:
            return word+initial_str+'ay'+punc

# Exercise 5
# function that takes in a message and returns it in morse code
def morseCode(message):
    #dictionary with morse code values for letter keys
    morse_dict = {'a':'.-','b':'-...','c':'-.-.', 'd':'-..', 'e':'.', 'f':'..-.', 'g':'--.', 'h':'....', 'i':'..', 
    'j':'.---', 'k':'-.-', 'l':'.-..', 'm':'--', 'n':'-.', 'o':'---', 'p':'.--.', 'q':'--.-', 'r':'.-.', 's':'...', 
    't':'-', 'u':'..-', 'v':'...-', 'w':'.--', 'x':'-..-', 'y':'-.--', 'z':'--..', '1':'.----', '2':'..---', '3':'...--', 
    '4':'....-', '5':'.....', '6':'-....', '7':'--...', '8':'---..', '9':'----.', '0':'-----'}
    #blank list to collect each letter when converted to morse code
    morse_word = []
    #for each letter, append the morse code equivalent to the morse_word list, ignoring capitalisation
    for letter in message:
        if letter.lower() in morse_dict:
            morse_word.append(morse_dict[letter.lower()])            
    #join the letters in the morse_word list into a string with spaces between letters
    return ' '.join(morse_word)

# Exercise 6
#dictionaries with text values for integer keys
dict_to20 = {0:'zero', 1:'one', 2:'two', 3:'three', 4:'four', 5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine', 10:'ten', 11:'eleven', 
12:'twelve', 13:'thirteen', 14:'fourteen', 15:'fifteen', 16:'sixteen', 17:'seventeen', 18:'eighteen', 19:'nineteen'}
dict_tens = {2:'twenty', 3:'thirty', 4:'forty', 5:'fifty', 6:'sixty', 7:'seventy', 8:'eighty', 9:'ninety'}
#function to deal with numbers less than 100
def tens(num):
    #check length to check if number is less than or greater than 10
    length = len(str(num))
    #create list of individual digits 
    tens_list = [int(d) for d in str(num)]
    #if number is less than 10, return text value of number using dict_to20
    if length == 1:
        return f'{dict_to20[tens_list[0]]}'
    #if number is between 10 and 19, return text value of number using dict_to20
    if length ==2:
        if 10<=num<=19:
            return f'{dict_to20[num]}'
    #if number is greater than 19, return text value by grabbing value of first digit from 'dict_tens' and second digit from 'dict_to20'
        else:
            return f'{dict_tens[tens_list[0]]} {dict_to20[tens_list[1]]}'

#function to convert inputted integer into a string of the text equivalent of the number
def int2Text(num):
        #convert number to string and check length
        str_num = str(num)
        length = len(str_num)
        #create list of individual digits from number
        num_list = [int(d) for d in str_num]
        #if number is less than 100, use tens function to return text equivalent
        if length<3:
            return tens(num)
        else:
            #if number is a round hundred, return text value from dict_to20 + 'hundred'
            if num_list[1] == 0 and num_list[2] == 0:
                    return f'{dict_to20[num_list[0]]} hundred'
            #otherwise use dict_to20 and tens function to generate text equivalent
            else:
                return f'{dict_to20[num_list[0]]} hundred {tens(int(str_num[1:]))}'

# Exercise 7
#function to take in a filename and retrn a list of the names of any functions within the file that are not preceded by a comment
def missingComment(filename):
        #open file and create list of each line
        file = (open(filename, 'r')).read()
        file_list = file.split('\n')
        #new list to collect names of functions with missing comments
        missingComment_list = []
        #function to grab the name of a function
        def grab_func_name(x):
            return (file_list[x][4:(file_list[x].index('('))])
        for x in range(len(file_list)):
            # check if each line begins with 'def ' to find functions
            if file_list[x][0:4]=='def ':
            #if this is the first line in the file, add the function nameto missingComment_list
                if x==0:
                    missingComment_list.append(grab_func_name(x))
            #if the preceding line is blank, add the function nameto missingComment_list
                elif len(file_list[x-1])==0:
                    missingComment_list.append(grab_func_name(x))
            #if the preceding line contains text that does not begin with '#' (ie. is not a comment), add the function nameto missingComment_list
                elif file_list[x-1][0]!='#':
                    missingComment_list.append(grab_func_name(x))
        return missingComment_list

# Exercise 8
#function that takes in a filename and a maximum line length and returns the file text as a list of lines filled as
#much as possible without exceeeding the maximum length
def consistentLineLength(filename, length):
        #open file, reading all lines and joining them into one string
        file_list = ((open(filename, 'r')).read()).split('\n')
        file_text = ' '.join(file_list)
        #split the text into list of words
        split_text = file_text.split()
        #create new list to add lines of text into
        line_list = [] 
        #create string to build each line
        line = '' 
        while len(split_text) > 0: 
            #while there are still words left in split_text
            #for the first word in the line, check that it will fit within maximum length and if so, add it
            #(if not return error message)
            if line == '':
                if len(split_text[0])<=length:
                    line+=split_text.pop(0)
                else:
                    return 'line length is less than the length of some words'
            #if not first word on line, check whether a space + the word will fit and if so, add to line
            else:
                if (len(line)+len(split_text[0])+1)<=length:
                    line+=(' '+split_text.pop(0))
            #if adding the next word would exceed maximum length, add the line to 'line_list' and start a blank line
                else:                
                    line_list.append(line)
                    line = ''
        #once all filled lines have been added, add any remaining text on the last line to line_list
        line_list.append(line)
        return line_list 

# Exercise 9

#function that takes in a start position, end position and maximum number of moves and returns true if it's possible for 
# a knight to reach the end position from the start in the given number of moves, and false if not
def knight(start, end, moves):
    # create string to find index positions of letters
    letters = 'abcdefgh' 
    #convert start position into a tuple of integers for x and y positions
    start_x = (letters.index(start[0]))+1
    start_y = int(start[1])
    end_position_tuple = ((letters.index(end[0]))+1, int(end[1]))
    #function that takes in a starting position and returns a knight's possible end positions
    def poss_ends(x,y,count,moves):
        possible_ends_final = set()
        possible_ends = [(x+1,y+2),(x+1,y-2),(x+2,y+1),(x+2,y-1),(x-1,y-2),(x-1,y+2),(x-2,y-1),(x-2,y+1)]
        #for each of these possible end positions, check whether they are on the board and if so, add to possible_ends_final
        for coordinate in possible_ends:
            if coordinate[0] in range (1,9) and coordinate[1] in range (1,9):
                possible_ends_final.add(coordinate)
        #check whether it's been possible to reach the desired end coordinate yet
        if end_position_tuple in possible_ends_final:
            return True
        #if not, check whether the max number of moves has been reached
        elif count == moves:
            return False
        #if max moves hasn't been reached, increase count and check end positions from another move from each of last turn's end positions
        else:
            count+=1
            for coordinate in possible_ends_final:
                if poss_ends(coordinate[0],coordinate[1],count,moves):
                    return True
            return False
    return poss_ends(start_x,start_y,1,moves)
    
# Exercise 10
#function that takes in a list of strings representing a grid and returns a list of strings representing
# the next state after the War of Species rules have been applied
def warOfSpecies(environment):
    #function that takes in a start position (x and y) and the grid length and width (xmax and ymax),
    # checks what the neighbouring positions within the grid are and creates a string of the characters in these positions 
    def neighbours(x,y,xmax,ymax):
        neighbours = []
        if y-1>=0:
            neighbours.append(environment[x][y-1])
        if y+1<ymax:
            neighbours.append(environment[x][y+1])
        if x-1>=0:
            neighbours.append(environment[x-1][y])
            if y-1>=0:
                neighbours.append(environment[x-1][y-1])
            if y+1<ymax:
                neighbours.append(environment[x-1][y+1])
        if x+1<xmax:
            neighbours.append(environment[x+1][y])
            if y-1>=0:
                neighbours.append(environment[x+1][y-1])
            if y+1<ymax:
                neighbours.append(environment[x+1][y+1])

        return ''.join(neighbours)
    #find length and width of grid
    xmax = len(environment)
    ymax = len(environment[0])
    #new list to collect the strings that represent the end state of the environment
    end_state = []
    #for each character in each string, use neighbours function to generate string of the neigbouring characters
    for x_coord in range(xmax):
        new_states = []
        for y_coord in range(ymax):
            neighbours_str = neighbours(x_coord,y_coord,xmax,ymax)
            #check the current character and the number of Xs and Os in the neighbouring characters
            current_pos = environment[x_coord][y_coord]
            Xs = neighbours_str.count('X')
            Os = neighbours_str.count('O')
            #using the rules of War of Species, convert each current character to its new state
            #append each new state to the new_states list
            if current_pos == '.':
                if Xs>=2 and Xs>Os:
                    new_states.append('X')
                elif Os>=2 and Os>Xs:
                    new_states.append('O')
                else:
                    new_states.append('.')
            elif (Xs+Os)>6:
                new_states.append('.')
            elif current_pos =='X' and Xs<3:
                new_states.append('.')
            elif current_pos =='O' and Os<3:
                new_states.append('.')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
            elif current_pos =='X' and Os>Xs:
                new_states.append('.')
            elif current_pos =='O' and Xs>Os:
                new_states.append('.')
            else:
                new_states.append(current_pos)
        #once all the characters in a string have been converted, add this string of new states to the end_state list
        end_state.append(''.join(new_states))
        
    return end_state      
 