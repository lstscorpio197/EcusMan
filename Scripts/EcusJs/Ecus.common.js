var $String = {
    Empty: "",
    Blank: " ",
    IsNullOrEmpty: function (str) {
        str = (str || this.Empty).trim();
        if (str == this.Empty) { return true; }
        return false;
    }
};
//============================================================================
var $Common={
    getInnerHeight:function(element){ element=element|| window; return element.innerHeight;},
    getInnerWidth:function(element){ element=element|| window; return element.innerWidth;},
    getPositionElement:function(element){
        return element.getBoundingClientRect();// trả về object {height,width, top, left, bottom, right} của element
    },
    isElementInViewPort:function(element, elementFrame){
        // Kiểm tra một thẻ bất kỳ có nằm trong khung của một thẻ cha(elementFrame) nào đấy không;
        elementFrame=elementFrame||window;
        let bounding = this.getPositionElement(element);
        return (
            bounding.top>=0 &&
            bounding.left>=0 &&
            bounding.bottom <= this.getInnerHeight(elementFrame) &&
            bounding.right <= this.getInnerWidth(elementFrame)
            );
    },
    addEventScrollElement:function(element){
        element=element|| window;
        element.addEventListener('scroll',function(){
            // Do something....
            //Ví dụ 1: Kiểm tra xem thẻ image.next-page có nằm trong khung chứa (element) không? nếu có thì load ảnh abc.jpeg
            let image= $('image.next-page');
            if(this.isElementInViewPort(image,element)){
                image.html('<img src="../.../abc.jpeg" />');
            }
            // Ví dụ 2: nếu một page dạng danh sách có nhiều trang, thì có thể load page tiếp theo.
        },false);
    }
}