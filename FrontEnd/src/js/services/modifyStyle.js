function modifyStyle() {
    return {
        switchClass: function() {
            var element = document.getElementById('ctable')
            var classes = element.className.split(/\s+/)
            var containActive = classes.indexOf('active')
            var containPostactive = classes.indexOf('postactive')
            if (containActive === -1 && containPostactive === -1) {
                //console.log('c1')
                classes.push('active')
            }
            if (containActive > 0 && containPostactive === -1) {
                //console.log('c2')
                classes.push('postactive')
            }
            if (containActive > 0 && containPostactive > 0) {
                //console.log('c3')
                classes.splice(containPostactive, 1)
            }
            if (containActive === -1 && containPostactive > 0) {
                //console.log('c4')
                classes.splice(containPostactive, 1)
                classes.push('active')
            }
            element.className = classes.join(' ')
        },
        removeClass: function() {
            var element = document.getElementById('ctable')
            if (element) {
                var classes = element.className.split(/\s+/)
                var index = classes.indexOf('active')
                if (index > 0) {
                    classes.splice(index, 1)
                    classes.push('postactive')
                    //console.log(classes)
                    element.className = classes.join(' ')
                }
            }
        }
    }
}

exports.modifyStyle = modifyStyle
