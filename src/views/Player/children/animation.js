import animations from "create-keyframe-animation";
const aniMixin = {
    methods: {
        //  获取打开页面起点坐标
        getPositionAndScale() {
            const originX = document.documentElement.clientWidth / 2 - 30;
            const originY = document.documentElement.clientHeight - this.$refs.top.clientHeight - this.$refs.scaleBox.clientHeight / 2 - 30;
            const myScale = 0.1
            return {
                originX,
                originY,
                myScale
            }
        },
        //cd唱片进场动画
        handleEnter(done) {
            const {
                originX,
                originY,
                myScale
            } = this.getPositionAndScale();
            // 关键帧动画对象
            const animation = {
                0: {
                    transform: `translate(-${originX}px, ${originY}px) scale(${myScale})`,
                },
                60: {
                    transform: "translate(0, 0) scale(1.1)",
                },
                100: {
                    transform: "translate(0, 0) scale(1)",
                },
            };
            //注册动画
            animations.registerAnimation({
                name: 'cd-enter-ani',
                animation: animation,
                presets: {
                    duration: 500,
                    easing: 'linear',
                }
            });
            //执行
            animations.runAnimation(this.$refs.scaleBox, 'cd-enter-ani', done)
        }
    }
}
export default aniMixin;