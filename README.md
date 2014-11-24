
install quick2wire-gpio-admin:

    git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
    cd quick2wire-gpio-admin
    make
    sudo make install
    sudo adduser $USER gpio


install wiringPi

    git clone git://git.drogon.net/wiringPi
    cd wiringPi
    ./build

