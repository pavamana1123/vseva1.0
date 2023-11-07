String.prototype.toNameCase = function(){
  var str = this
  str = str.replaceAll('.', ' ')
  str = str.replace(/  +/g, ' ')
  str = str.trim()
  var parts = str.split(" ")
  if(parts.length!=str.replaceAll(" ","").length){
    while(parts[0].length==1){
      parts.push(parts.shift())
    }
  }
  str=parts.join(" ")
  return str.toTitleCase()
}

String.prototype.toCamelCase = function() {
  return this.toLowerCase()
    .replace( /['"]/g, '' )
    .replace( /\W+/g, ' ' )
    .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
    .replace( / /g, '' );
}

String.prototype.toTitleCase = function() {
  return this.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

String.prototype.toPhoneCase = function() {
  if (this.length <= 10) {
      return this;
    } else {
      return this.slice(-10);
    }
}

String.prototype.color = function() {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum += this.charCodeAt(i);
  }
  const lightMaterialColors = [
    '#8BC34A', // Light Green
    '#CDDC39', // Lime
    '#FFEB3B', // Yellow
    '#FFC107', // Amber
    '#FF9800', // Orange
    '#FF5722', // Deep Orange
    '#03A9F4', // Light Blue
    '#00BCD4', // Cyan
    '#607D8B', // Blue Grey
    '#9E9E9E', // Grey
    '#F44336', // Red
    '#2196F3', // Light Blue
    '#4CAF50', // Green
    '#E91E63', // Pink
    '#673AB7', // Deep Purple
    '#03A9F4', // Light Blue
    '#4CAF50', // Green
    '#2196F3', // Blue
    '#607D8B', // Blue Grey
    '#9E9E9E'  // Grey
  ]

  return lightMaterialColors[sum % lightMaterialColors.length];
}


