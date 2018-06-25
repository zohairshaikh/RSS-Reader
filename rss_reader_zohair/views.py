from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
import requests
import datetime
import json
import xml.etree.ElementTree as ElementTree
import os
import uuid


def home_controller(request):
    return render(request, 'home_template.html')


def renderframe(request):
    try:
        url = request.GET.get('url')
        resp = requests.get(url)

        # generating file names with unique ID as there can be concurrent requests.
        filename = str(uuid.uuid1()) + '_rss.xml'
        with open(filename, 'wb') as f:
            f.write(resp.content)
        f.close()

        parsed_data = []
        # XML parsing guide : https://www.geeksforgeeks.org/xml-parsing-python/

        tree = ElementTree.parse(filename)
        root = tree.getroot()
        # iterate news items
        all_items = root.findall('./channel/item')
        for item in all_items:
            obj = {}
            for element in item:
                obj[element.tag] = element.text
            parsed_data.append(obj)

        # deleting file once data is extracted
        os.remove(filename)
        return HttpResponse(json.dumps(parsed_data), content_type='application/json', status=200)
    except:
        return HttpResponse(status=500)
