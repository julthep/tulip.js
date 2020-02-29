"""
@author: julthep
"""

__author__ = "Julthep Nandakwang"
__version__ = "0.1.0"
__license__ = "LGPL-3.0"

class TulipJS:
    def __init__(self, d):
        self.member = [ TulipJS(d['member'][i]) for i in range(len(d['member']))]
        self.type   = {'Group': d['type']['Group'], 'Item':      d['type']['Item'], 
                       'Page':  d['type']['Page'],  'Paragraph': d['type']['Paragraph'], 
                       'Table': d['type']['Table'], 'Column':    d['type']['Column'], 
                       'Row':   d['type']['Row'],   'Cell':      d['type']['Cell'], 
                       'List':  d['type']['List'],  'ListItem':  d['type']['ListItem']}
        self.label  = d['label']
        self.style  = {'Emphasize': d['style']['Emphasize'], 'Enumerate':  d['style']['Enumerate'],
                       'ColMajor':  d['style']['ColMajor'],  'RowMajor':   d['style']['RowMajor'], 
                       'GrpSpan':   d['style']['GrpSpan'],   'LineSpan':   d['style']['LineSpan'], 
                       'GrpSpanBr': d['style']['GrpSpanBr'], 'LineSpanBr': d['style']['LineSpanBr']}
        self.dimension = d['dimension']
        self.link = d['link']
        # no need to load .local temporary working dict from JSON file, just initial them for HTML generation
        self.local = {'GrpSkip': None, 'LineSkip': None, 'GrpSpan': None, 'LineSpan': None}
    def __len__(self):
        return len(self.member)
    # Transcrypt seems not completely mimic __getitem__ for this case, 
    #   so have to override in code by append .member[index] each one manually.
    def __iter__(self):
        for item in self.member:
            yield item
    def to_list(self):
        for key in self.type.keys():
            self.type[key] = None
        self.type['List'] = True
    def to_table(self):
        for key in self.type.keys():
            self.type[key] = None
        self.type['Table'] = True
    def to_row_maj(self):
        self.style['ColMajor'] = False
        self.style['RowMajor'] = True
    def to_col_maj(self):
        self.style['RowMajor'] = False
        self.style['ColMajor'] = True

tulip_obj = ''

def change_to_list(tulip):
    """Change any TULIP Type to List
    
    Arguments:
        tulip {TulipJS object} -- focused TulipJS object
    """
    tulip.to_list()
    # regenerate HTML to refresh page
    regen(tulip_obj)   # gen whole object

def change_to_table(tulip):
    """Change any TULIP Type to Table
    
    Arguments:
        tulip {TulipJS object} -- focused TulipJS object
    """
    tulip.to_table()
    # regenerate HTML to refresh page
    regen(tulip_obj)   # gen whole object

def change_to_row_maj(tulip):
    """Change from Col to Row Major
    
    Arguments:
        tulip {TulipJS object} -- focused TulipJS object
    """
    tulip.to_row_maj()
    # regenerate HTML to refresh page
    regen(tulip_obj)   # gen whole object

def change_to_col_maj(tulip):
    """Change from Row to Col Major
    
    Arguments:
        tulip {TulipJS object} -- focused TulipJS object
    """
    tulip.to_col_maj()
    # regenerate HTML to refresh page
    regen(tulip_obj)   # gen whole object

def read_url(url=document.getElementById('tulip_res').value+'.json'):
    """
    read_url(str:URL)
    """
    print('Reading url', url)
    xhr = __new__ (XMLHttpRequest())
    def success():
        global tulip_obj
        tulip_text = xhr.responseText
        tulip_json = JSON.parse(tulip_text)
        tulip_obj = TulipJS(tulip_json)
        regen(tulip_obj)
    xhr.onload = success
    xhr.open('GET', url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("Charset", "utf-8")
    xhr.send()

def regen(tulip):
    res = gen_html(tulip)
    console.log(res)           # for checking
    document.getElementById('tulip_out').innerHTML = res
    document.getElementById('tulip_src').innerHTML = res

def gen_html(tulip):
    """
    gen_html(Tulip:tulip)
    return str:html
    """
    print('Generating HTML')
    html = '''<!DOCTYPE html>
<html>
  <head>
    <title>'''
    if tulip.label != None:
        html += tulip.label
    html += '''</title>
  </head>
  <body style="font-family: sans-serif">
'''
    indent = str_repeat(' ', 2)
    level = 1
    # optional enumerate tulip main object to keep track of subobject
    for num, tulip_grp in enumerate(tulip):
        if tulip_grp.type['Table']:
            level += 1
            html += _html_table_recursion(tulip_grp, level, '.member[' + str(num) + ']')
            level -= 1
        elif tulip_grp.type['List']:
            level += 1        # caution: leave increment here, do not move into recursion
            html += _html_list_recursion(tulip_grp, level, '.member[' + str(num) + ']')
            level -= 1        # caution: leave decrement here, do not move into recursion
        else:
            pass                # TO DO: handle later
    html += str_repeat(indent, level) + '</body>\n'
    html += '</html>'
    return html

def str_repeat(str, n):
    """Repeat string for n times 
    (workaround for Python string multiplication not yet support in Transcrypt
    to avoid using JavaScript str.repeat() to keep Python source compatible)
    
    Arguments:
        str {string} -- string to repeat
        n {int} -- number of repeat
    """
    repeat = ''
    for _ in range(n): repeat += str
    return repeat

def _html_table_recursion(tulip, level, submem):
    """Recursive HTML table generator
    
    Arguments:
        tulip {Tulip} -- passing tulip object
        level {int} -- passing level
        submem {str} -- passing member subscription
    """
    indent = str_repeat(' ', 2)
    col_major = True if not tulip.style['RowMajor'] else False
    html = ''
    html += str_repeat(indent, level) + '<button onclick="tulip.change_to_list(tulip.tulip_obj' + submem + ')">To List</button>\n'
    html += str_repeat(indent, level) + ('<button onclick="tulip.change_to_row_maj(tulip.tulip_obj' + submem + ')">To Row Maj</button>\n'
                                         if col_major else
                                         '<button onclick="tulip.change_to_col_maj(tulip.tulip_obj' + submem + ')">To Col Maj</button>\n')
    html += str_repeat(indent, level) + '<table border="1" style="border-collapse: collapse">\n'
    if tulip.label != None:
        html += str_repeat(indent, level+1) + '<caption><strong>' + tulip.label.replace('\n','<br />') + '</strong></caption>\n'
    ##### tulip.local prepared loop
    # cell line span loop
    max_line = 0                            # max_row -> max_line
    max_grp = len(tulip)
    for grp in range(max_grp):            # col -> grp
        line_span = None                    # row_span -> line_span
        line_len = len(tulip.member[grp])   # row_len -> line_len
        if line_len > max_line: max_line = line_len     # collect max_line for irregular table of list-converted table
        for line in range(line_len):        # row -> line
            if line_span == None:
                show_line = line
                line_span = 0
            line_span += 1
            try:
                tulip.member[grp].member[line].local['LineSkip'] = True
            except:
                line_span = None
            #### 'last cell of span' conditions
            try:
                # Check that this is not LineSpan cell or 
                # it is not the last cell (row/col) of group
                # (which not need to be equal with other group)
                if (tulip.member[grp].member[line].style['LineSpan'] == None or
                                                                line == line_len-1):
                    tulip.member[grp].member[show_line].local['LineSpan'] = line_span
                    tulip.member[grp].member[show_line].local['LineSkip'] = None
                    line_span = None
                # Check that this label is different from next cell (row/col)
                # This condition have to separated check, even same consequence as above 
                # (because [line+1] could produce error, which will be filtered out by above)
                elif (tulip.member[grp].member[line].style['LineSpan'] and 
                        tulip.member[grp].member[line].label != tulip.member[grp].member[line+1].label):
                    tulip.member[grp].member[show_line].local['LineSpan'] = line_span
                    tulip.member[grp].member[show_line].local['LineSkip'] = None
                    line_span = None
            except:
                line_span = None
    # cell group span loop
    for line in range(max_line):
        grp_span = None
        for grp in range(max_grp):
            if grp_span == None:
                show_grp = grp
                grp_span = 0
            grp_span += 1
            try:
                tulip.member[grp].member[line].local['GrpSkip'] = True
            except:
                grp_span = None
            #### 'last cell of span' conditions
            try:
                # Check that this is not GrpSpan cell and 
                # it is not the last cell (row/col) of group
                # (which not need to be equal with other group)
                if (tulip.member[grp].member[line].style['GrpSpan'] == None or
                                                                grp == max_grp-1):
                    tulip.member[show_grp].member[line].local['GrpSpan'] = grp_span
                    tulip.member[show_grp].member[line].local['GrpSkip'] = None
                    grp_span = None
                # Check that this label is different from next cell (row/col)
                # This condition have to separated check, even same consequence as above 
                # (because [grp+1] could produce error, which will be filtered out by above)
                elif (tulip.member[grp].member[line].style['GrpSpan'] and 
                        tulip.member[grp].member[line].label != tulip.member[grp+1].member[line].label):
                    tulip.member[show_grp].member[line].local['GrpSpan'] = grp_span
                    tulip.member[show_grp].member[line].local['GrpSkip'] = None
                    grp_span = None
            except:
                grp_span = None
    ##### HTML generated loop
    ### Dummy "Group"-row/col generator
    level += 1
    has_dummy_row = False
    has_table_row = False
    dummy_row = str_repeat(indent, level) + '<tr>\n'
    dummy_row_th = dummy_row
    for col in range(len(tulip)):
        if len(tulip.member[col]) > 0:
            has_table_row = True
        level += 1
        dummy_row += str_repeat(indent, level) + ('<th>\n' 
                                if tulip.member[col].style['Emphasize'] 
                                else '<td>\n')
        dummy_row_th += str_repeat(indent, level) + '<th>\n'
        level += 1
        # try first, except in case of irregular table (eg. rfc1942 example)
        # IndexError, js_TypeError on Sample Table
        if tulip.member[col].label != None:
            linked_text = tulip.member[col].label
            has_dummy_row = True
        else:
            linked_text = ''
        # Transcrypt has problem with obj.items() in this case, use ES2017 Object.entries(obj) instead
        for key, url in Object.entries(tulip.member[col].link):
            if key[:5] == 'text:':
                linked_text = linked_text.replace(key[5:], '<a href="' + url + '">' + key[5:] + '</a>')
            elif key[:6] == 'image:':
                linked_text += '<a href="' + url + '"><img src="' + key[6:] + '"></a>'
        if linked_text != '':
            dummy_row_tmp = str_repeat(indent, level) + linked_text.replace('\n','<br />') + '\n'
            dummy_row += dummy_row_tmp
            dummy_row_th += dummy_row_tmp
        level -= 1
        dummy_row += str_repeat(indent, level) + ('</th>\n' 
                                if tulip.member[col].style['Emphasize'] 
                                else '</td>\n')
        dummy_row_th += str_repeat(indent, level) + '</th>\n'
        level -= 1
    dummy_row += str_repeat(indent, level) + '</tr>\n'
    dummy_row_th += str_repeat(indent, level) + '</tr>\n'
    level -= 1
    if col_major and has_dummy_row:
        html += dummy_row_th if has_table_row else dummy_row
    #### Main HTML Tabel generator
    # use max_line for irregular table or from list-converted table
    max_row = max_line if col_major else max_grp
    max_col = max_grp if col_major else max_line
    for row in range(max_row):
        level += 1
        html += str_repeat(indent, level) + '<tr>\n'
        row_span = 0
        col_span = 0                # working
        for col in range(max_col):
            try:
                if col_major:
                    if (tulip.member[col].member[row].local['GrpSkip'] or
                        tulip.member[col].member[row].local['LineSkip']):
                        continue
                else:
                    if (tulip.member[row].member[col].local['GrpSkip'] or
                        tulip.member[row].member[col].local['LineSkip']):
                        continue
            except:
                pass
            try:
                if col_major:
                    if tulip.member[col].member[row].local['LineSpan'] != None:
                        row_span = tulip.member[col].member[row].local['LineSpan']
                else:
                    if tulip.member[row].member[col].local['GrpSpan'] != None:
                        row_span = tulip.member[row].member[col].local['GrpSpan']
            except:
                pass
            try:
                if col_major:
                    if tulip.member[col].member[row].local['GrpSpan'] != None:
                        col_span = tulip.member[col].member[row].local['GrpSpan']
                else:
                    if tulip.member[row].member[col].local['LineSpan'] != None:
                        col_span = tulip.member[row].member[col].local['LineSpan']
            except:
                pass

            level += 1
            try:
                if col_major:
                    if row_span > 1:
                        html += str_repeat(indent, level) + ('<th rowspan="' + str(row_span) + '">\n' 
                                                if tulip.member[col].member[row].style['Emphasize'] 
                                                else '<td rowspan="' + str(row_span) + '">\n')
                    elif col_span > 1:
                        html += str_repeat(indent, level) + ('<th colspan="' + str(col_span) + '">\n' 
                                                if tulip.member[col].member[row].style['Emphasize'] 
                                                else '<td colspan="' + str(col_span) + '">\n')
                    else:
                        html += str_repeat(indent, level) + ('<th>\n' 
                                                if tulip.member[col].member[row].style['Emphasize'] 
                                                else '<td>\n')
                else:
                    if row_span > 1:
                        html += str_repeat(indent, level) + ('<th rowspan="' + str(row_span) + '">\n' 
                                                if tulip.member[row].member[col].style['Emphasize'] 
                                                else '<td rowspan="' + str(row_span) + '">\n')
                    elif col_span > 1:
                        html += str_repeat(indent, level) + ('<th colspan="' + str(col_span) + '">\n' 
                                                if tulip.member[row].member[col].style['Emphasize'] 
                                                else '<td colspan="' + str(col_span) + '">\n')
                    else:
                        html += str_repeat(indent, level) + ('<th>\n' 
                                                if tulip.member[row].member[col].style['Emphasize'] 
                                                else '<td>\n')
            except:
                html += str_repeat(indent, level) + '<td>\n'
            level += 1
            # try first, except in case of irregular table (eg. rfc1942 example)
            try:
                if col_major:
                    if tulip.member[col].member[row].label != None:
                        linked_text = tulip.member[col].member[row].label
                    else:
                        linked_text = ''
                else:
                    if tulip.member[row].member[col].label != None:
                        linked_text = tulip.member[row].member[col].label
                    else:
                        linked_text = ''
                # Transcrypt has problem with obj.items() in this case, use ES2017 Object.entries(obj) instead
                if col_major:
                    for key, url in Object.entries(tulip.member[col].member[row].link):
                        if key[:5] == 'text:':
                            linked_text = linked_text.replace(key[5:], '<a href="' + url + '">' + key[5:] + '</a>')
                        elif key[:6] == 'image:':
                            linked_text += '<a href="' + url + '"><img src="' + key[6:] + '"></a>'
                else:
                    for key, url in Object.entries(tulip.member[row].member[col].link):
                        if key[:5] == 'text:':
                            linked_text = linked_text.replace(key[5:], '<a href="' + url + '">' + key[5:] + '</a>')
                        elif key[:6] == 'image:':
                            linked_text += '<a href="' + url + '"><img src="' + key[6:] + '"></a>'
                if linked_text != '':
                    html += str_repeat(indent, level) + linked_text.replace('\n','<br />') + '\n'
                ### point of recursion
                # ** Table type is finite recursion i.e. it has only 2 level column then row (or row then column)
                # ** after complete fixed 2 loops, we then check again for next recursion, whether they are sub-tables or sub-list
                if col_major:
                    if tulip.member[col].member[row].type['Table']:
                        html += _html_table_recursion(tulip.member[col].member[row], level, submem + 
                                                    '.member[' + str(col) + '].member[' + str(row) + ']')
                    else:
                        html += _html_list_recursion(tulip.member[col].member[row], level, submem + 
                                                    '.member[' + str(col) + '].member[' + str(row) + ']')
                else:
                    if tulip.member[row].member[col].type['Table']:
                        html += _html_table_recursion(tulip.member[row].member[col], level, submem + 
                                                    '.member[' + str(row) + '].member[' + str(col) + ']')
                    else:
                        html += _html_list_recursion(tulip.member[row].member[col], level, submem + 
                                                    '.member[' + str(row) + '].member[' + str(col) + ']')
            except:
                pass
            level -= 1
            try:
                if col_major:
                    html += str_repeat(indent, level) + ('</th>\n' 
                                            if tulip.member[col].member[row].style['Emphasize'] 
                                            else '</td>\n')
                else:
                    html += str_repeat(indent, level) + ('</th>\n' 
                                            if tulip.member[row].member[col].style['Emphasize'] 
                                            else '</td>\n')
            except:
                html += str_repeat(indent, level) + '</td>\n'
            level -= 1
        html += str_repeat(indent, level) + '</tr>\n'
        level -= 1
    html += str_repeat(indent, level) + '</table>\n'
    console.log(html)           # for checking
    return html

def _html_list_recursion(tulip, level, submem):
    """Recursive HTML list generator
    
    Arguments:
        tulip {Tulip} -- passing tulip object
        level {int} -- passing level
        submbr {str} -- passing member subscription
    """
    indent = str_repeat(' ', 2)
    html = ''
    # temporary use <strong> for adding root list label
    if level == 2 and tulip.label != None:          # if the first call, not in recursion
        html += str_repeat(indent, level) + '<strong>' + tulip.label.replace('\n','<br />') + '</strong>\n'
    header_added = False
    list_tag = 'ol' if tulip.style['Enumerate'] else 'ul'
    for i,node in enumerate(tulip):
        if not header_added:
            html += str_repeat(indent, level) + '<button onclick="tulip.change_to_table(tulip.tulip_obj'+submem+')">To Table</button>\n'
            html += str_repeat(indent, level) + '<' + list_tag + '>\n'
            level += 1
            header_added = True
        html += str_repeat(indent, level) + '<li>\n'
        level += 1
        if node.label != None:
            linked_text = node.label
        else:
            linked_text = ''
        # Transcrypt has problem with obj.items() in this case, use ES2017 Object.entries(obj) instead
        for key, url in Object.entries(node.link):
            if key[:5] == 'text:':
                linked_text = linked_text.replace(key[5:], '<a href="' + url + '">' + key[5:] + '</a>')
            elif key[:6] == 'image:':
                linked_text += '<a href="' + url + '"><img src="' + key[6:] + '"></a>'
        if linked_text != '':
            html += str_repeat(indent, level) + ('<strong>' + linked_text.replace('\n','<br />') + '</strong>'
                                                 if node.style['Emphasize']
                                                 else linked_text.replace('\n','<br />')) + '\n'
        ### point of recursion
        if tulip.member[i].type['Table']:
            html += _html_table_recursion(tulip.member[i], level, submem + '.member[' + str(i) + ']')
        # ** List is infinite recursion so if its member is not specific as Table (or other) we will assume it is sub-list.
        else:
            html += _html_list_recursion(tulip.member[i], level, submem + '.member[' + str(i) + ']')
        level -= 1
        html += str_repeat(indent, level) + '</li>\n'
    if header_added:
        level -= 1
        html += str_repeat(indent, level) + '</' + list_tag + '>\n'
    console.log(html)           # for checking
    return html

def main():
    test_article      = 'Chulalongkorn University'
    read_url(test_article.replace(' ','_')+'.json')

if __name__ == '__main__':
    main()
