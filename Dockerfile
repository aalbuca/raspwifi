FROM alpine


RUN apk update

RUN apk add alpine-sdk wireless-tools wireless-tools-dev wpa_supplicant dnsmasq iw

##COPY ./*.conf /sr/

##WORKDIR /sr

##RUN ifconfig

##CMD ["hostapd", "hostapd.conf"]

