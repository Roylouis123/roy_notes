// vi editor
wq - save
q! - quit
q - quit without saving
esc - quit
i - write file
r - replace
n - next
p - previous
d - delete
u - undo
y - redo

// nano editor
ctrl + o - save
ctrl + x - quit
ctrl + w - quit without saving
ctrl + r - replace
ctrl + n - next
ctrl + p - previous
ctrl + d - delete
ctrl + u - undo
ctrl + y - redo



// grep command 

// finds data inside the file

ls
doc1  // consist of data ====roy boy munna goi
doc2  // consist of data ====roy1 boy1 munna1 goi1


grep 'munna' doc1  // prints munna

grep -i 'munna' doc2  // neglects upper and lower cases

grep -w 'munna1' doc2  // prints exact match munna1

grep -n 'munna' doc2  // prints line number

grep -c 'munna' doc2  // prints count

grep -l 'munna'   // prints file name

grep -e 'munna' -e 'boy' doc2  // prints both munna and boy

grep -v 'munna' doc2  // prints everything except munna

grep -R 'munna' .  // prints all files with munna





|  // pipe

 cat temp.txt temp1.txt // concats temp.txt and temp1.txt

 cat temp temp1.txt | sort // sorts both files

 cat temp temp1.txt | head -1 // prints first line of both files

 cat temp temp1.txt | tail -2 // prints last two lines of both files



 chmod // Permission control

 --- // no permission
 --x // execute permission
 -w- // write permission
 r-- // read permission
 -wx // write and execute permission
 r-x // read and execute permission
 rw- // read and write permission
 rwx // read, write and execute permission



ls -ltr
total 20
-rw-r--r-- 1 roy roy    0 Jun 21 12:46 test
-rw-r--r-- 1 roy roy   13 Jun 21 13:17 temp.text
-rw------- 1 roy roy   21 Jun 21 15:51 temp


 chmod a-rwxr temp // removes write permission for others

 chmod u+rw temp // adds write permission for user

 chmod ugo+w temp // adds write permission for user and group

 chmod o-w temp // removes write permission for others

 // give execute permission
 chmod +x temp // adds execute permission for user and group



comments 

# // This is a comment

<<comment 
This is a multi 
line comment
comment


crontab

crontab -l // prints current crontab

crontab -e // edit crontab

cat /var/log/syslog | grep CRON // prints cron job logs