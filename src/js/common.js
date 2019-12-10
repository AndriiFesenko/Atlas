'use strict'

class Atlas {
    constructor() {
        this.slideButtons = document.getElementsByClassName('slide-buttons')[0];
        
        this.commentSlides = document.getElementsByClassName('feedback-slides');
        this.photoBlock = document.getElementsByClassName('photoBlock')[0].children[0];
        this.photoPopupContainer = document.getElementsByClassName('photo-popup-container')[0];
        this.closeAlbumPopupButton = document.getElementsByClassName('close-button')[0];
        this.slideAlbumButtons = this.photoPopupContainer.getElementsByClassName('slide-buttons')[0];


        this.activeSlideNubmer = 0;
        this.currentImg;
        this.slideButtons.addEventListener('click', this.onSlideButtonsClick.bind(this));
        this.photoBlock.addEventListener('click', (e) => this.onPhotoClick(e));
        this.closeAlbumPopupButton.addEventListener('click', (e) => this.closeAlbumPopup(this.photoPopupContainer,e));
        this.slideAlbumButtons.addEventListener('click', (e) => this.slideAlbumPhotos(e));
    }

    onSlideButtonsClick(e) {
        let activeSlide = this.commentSlides[0].children;
        if(e.target.tagName === 'INPUT') {
            let index = this.getIndex(e.target, this.slideButtons.getElementsByTagName('input'))
            this.hideAllCommentSlides();
            this.showSelectedComment(index);
        }
        if (e.target.className === 'right-slider' 
            || e.target.parentNode.className == 'right-slider') {
                this.showNextElement(activeSlide);
            } else if (e.target.className === 'left-slider' 
            || e.target.parentNode.className == 'left-slider') {
                this.showPreviousElement(activeSlide);
            }
    }
    hideAllCommentSlides() {
        Array.from(this.commentSlides[0].children).forEach((element) => {
            element ? element.style.display = 'none' : null;
        })
    }
    showSelectedComment(index) {
        this.commentSlides[0].children[index] ? 
            this.commentSlides[0].children[index].style.display = 'flex' 
            : this.commentSlides[0].children[0].style.display = 'flex' ;
    }
    showNextElement(activeSlide) {
        // finish sliding on penultimate element
        if(this.activeSlideNubmer === this.commentSlides[0].children.length -2) {
            null;
        } else {
            activeSlide[this.activeSlideNubmer].style =  'display: none';
            this.activeSlideNubmer += 1;
            activeSlide[this.activeSlideNubmer+1].style =  'display: flex';
        }
    }
    showPreviousElement(activeSlide) {
        if(this.activeSlideNubmer === 0) {
            null;
        } else {
            activeSlide[this.activeSlideNubmer+1].style =  'display: none';
            this.activeSlideNubmer -= 1;
            activeSlide[this.activeSlideNubmer].style =  'display: flex';
        }
    }

    onPhotoClick(e) {
        if (e.target.tagName === 'IMG' && screen.width > 1024) {
            this.currentImg = e.target;
            this.showAlbumPopup(this.photoPopupContainer);
            this.setMainPhoto(this.photoPopupContainer, this.currentImg);
        }
    }
    slideAlbumPhotos(e) {
        let lastImgIndex = this.currentImg.parentNode.children.length-1;
        let index = this.getIndex(this.currentImg, this.currentImg.parentNode.children);

        if (e.target.className == 'right-slider' 
            || e.target.parentNode.className == 'right-slider') {

                index === lastImgIndex ? this.showFirstImage() : this.continueSliding('next');
                this.setMainPhoto(this.photoPopupContainer, this.currentImg);

            } else if (e.target.className == 'left-slider' 
            || e.target.parentNode.className == 'left-slider') {

                index === 0 ? this.showLastImage() : this.continueSliding('prev');
                this.setMainPhoto(this.photoPopupContainer, this.currentImg);
                
            }
    }
    showFirstImage() {
        this.currentImg = this.currentImg.parentNode.children[0]
    }
    showLastImage() {
        let currentImgContainer = this.currentImg.parentNode.children
        this.currentImg = currentImgContainer[currentImgContainer.length-1]
    }
    continueSliding(way) {
        this.currentImg = way === 'next' ? this.currentImg.nextElementSibling 
                                        : this.currentImg.previousElementSibling
    }
    getIndex(currentElement, element) {
        return Array.from(element).findIndex((el) => currentElement == el);
    }
    showAlbumPopup(element) {
        element.style.display = 'flex';
    }
    setMainPhoto(photoPopupContainer, currentImg) {
        let imgbox = photoPopupContainer.getElementsByClassName('img-box');
        imgbox[0].innerHTML = `<img src='${currentImg.getAttribute('src')}'>`;
    }
    closeAlbumPopup(element, e) {
        console.log(e.target);
        element.style.display = 'none';
    }
}

const atlas = new Atlas();