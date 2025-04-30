// Show current user:
whoami

// Show current hostname:
hostname

// Display the contents of a file:
cat /etc/passwd

// Display the contents of a directory:
ls /home

// Display the current date and time:
date

// creates new file
touch

// runs the file
./roy.sh

// Display the current directory:
pwd

// Change the current directory:
cd /home

// Create a new directory:
mkdir mydir

// Delete a directory:
rmdir mydir

// Create a new file:
touch myfile.txt

// Delete a file:
rm myfile.txt

// zip file in current directory
zip myfile.zip myfile.txt

// unzip file in current directory
unzip myfile.zip

// change to root user
sudo

// Append text to a file:
echo "Hello, World!" >> myfile.txt

// Delete folder and data in it
rm -rf mydir

// Rename a file:
mv myfile.txt mynewfile.txt

// Copy a file:
cp myfile.txt mycopy.txt

// Display the contents of a file:
cat myfile.txt

// Display the contents of a directory:
ls -l

// Display the contents of a directory with all properties:
ls -ltr

// Display the contents of a file with line numbers:
nl myfile.txt


// find the folder where the file is located
whereis myfile.txt

// find files in the current directory
find . -name "myfile.txt"

// find files in all folder
find / -name "myfile.txt"

// Display the environment variables:
env

// Display the processes running on the system:
ps aux

// Display the top processes using the most CPU and memory:
top

// Display the system information:
uname -a

// Display the IP address of the system:
ip addr show

// Display the routing table:
ip route show

// Display the network interfaces:
ip link show

// Display the disk usage of the system:
df -h

// Display the memory usage of the system:
free -m
