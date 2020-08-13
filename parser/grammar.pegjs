Source = s:(JugBlock / Text)* { return s; }


Text = (!JugOpen .)+ { return [0, text()]; }


String
  = (DoubleString / SingleString) { return text(); }
  
DoubleString
  = '"' (('\\"' / !'"') .)* '"'
  
SingleString
  = "'" (("\\'" / !"'") .)* "'"
  

JugBlock = JugOpen _+ s:JugSource+ JugClose { return [1, s.join("")]; }

JugSource
  = String { return text(); }
  / (!JugClose .) { return text(); }

JugOpen = '<#jug'

JugClose = '#>'


_ "whitespace"
  = [ \t\n\r]
