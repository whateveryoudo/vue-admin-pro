<template>
    <div class="todo-list-container">
        <header>
            <!--            全选-->
            <input class="todo-checkbox" type="checkbox" :checked="allChecked" @change="toggleAll">
            <div class="label">
                <input class="keyword" type="text" placeholder="请添加新的处理项" @keyup.enter="addTodo"/>
            </div>
        </header>
        <section>
<!--            <el-input @input="test1" :value="test" placeholder="aaa"></el-input>-->
<!--            TODO 拆分为组件形式-->
            <ul class="todo-list-wrapper">
                <li class="list-item" v-for="(todo,index) in filteredTodos" :key="index" >
                    <div class="normal"v-show="!todo.isEdit">
                        <input :checked="todo.done"
                               class="todo-checkbox"
                               type="checkbox"
                               @change="toggleTodo(index)"
                        >
                        <div class="label" @dblclick="handleEdit(index)">{{todo.text}}</div>
                        <button class="close-btn" @click="closeCurItem(index)"></button>
                    </div>
                    <div class="editing" v-show="todo.isEdit">
<!--                        blur 与保存冲突-->
                        <el-input type="text"
                               :value="todo.text"
                               @keyup.enter="doneEdit(index)"
                               @input="val => listenInput(val,index)"
                               @keyup.esc="cancelEdit(index)"
                               placeholder="请输入"
                        ></el-input>
                        <div class="btns-wrapper">
                            <el-button size="small" @click="cancelEdit(index)">取消</el-button>
                            <el-button size="small" type="primary"  @click="doneEdit(index)">保存</el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <footer class="footer">
            <span>未做项（{{unFinished.length}}）</span>
            <ul class="filter-wrapper">
                <li :class="{selected : curType === 1}"  @click="handleFilter(1)">全部</li>
                <li :class="{selected : curType === 2}" @click="handleFilter(2)">进行中</li>
                <li :class="{selected : curType === 3}" @click="handleFilter(3)">已完成</li>
            </ul>
        </footer>
    </div>
</template>

<script>
    const defaultList = [
        { text: 'star this repository', done: false,isEdit : false },
        { text: 'fork this repository', done: false,isEdit : false },
        { text: 'follow author', done: false,isEdit : false },
        { text: 'vue-element-admin', done: true,isEdit : false },
        { text: 'vue', done: true,isEdit : false },
        { text: 'element-ui', done: true,isEdit : false },
        { text: 'axios', done: true,isEdit : false },
        { text: 'webpack', done: true,isEdit : false }
    ];
    export default {
        name: "TodoList",
        data(){
            return {
                test : '',
                todoList : defaultList,
                copyText : '',
                curType : 1 // 筛选类型 1-全部 2-进行中 3-已完成
            }
        },
        computed : {
            filteredTodos(){
                if(this.curType === 1){
                    return this.todoList.filter(item => item);
                }else if(this.curType === 2){
                    return this.todoList.filter(item => !item.done);
                }else{
                    return this.todoList.filter(item => item.done);
                }
            },
            allChecked(){
                return this.todoList.every(item => item.done);
            },
            unFinished(){
                return this.todoList.filter(item => !item.done);
            }
        },
        methods : {
            test1(e){debugger;},
            toggleAll(){
                this.todoList = this.todoList.map(item => {
                    return {...item,done : !this.allChecked}
                });
            },
            addTodo(e){
                if(!e.target.value){return}
                const perItem = {text : e.target.value.trim(),done : false,isEdit : false};
                this.todoList.push(perItem);
            },
            toggleTodo(index){
                let tempList = [...this.todoList];
                tempList.splice(index,1,{
                    ...tempList[index],
                    done : !tempList[index].done
                })
                this.todoList = tempList;
            },
            closeCurItem(index){
                let tempList = [...this.todoList];
                tempList.splice(index,1)
                this.todoList = tempList;
            },
            handleFilter(type){
                this.curType = type;
            },
            handleEdit(index){
                let tempList = [...this.todoList];
                tempList.splice(index,1,{
                    ...tempList[index],
                    isEdit : true
                })
                this.copyText = tempList[index].text;//缓存当前编辑值
                this.todoList = tempList;
            },
            listenInput(value,index){
                console.log(value);
                let tempList = [...this.todoList];
                tempList.splice(index,1,{
                    ...tempList[index],
                    text : value.trim()
                });
                this.todoList = tempList;
            },
            doneEdit(index){
                let tempList = [...this.todoList];
                if(!tempList[index].text){
                    this.$message({
                        message: '修改值不能为空',
                        type: 'warning'
                    });
                    return;
                }
                tempList.splice(index,1,{
                    ...tempList[index],
                    isEdit : false
                });
                this.todoList = tempList;
            },
            cancelEdit(index){
                let tempList = [...this.todoList];
                tempList.splice(index,1,{
                    ...tempList[index],
                    isEdit : false,
                    text : this.copyText.trim() //内容还原
                });
                this.todoList = tempList;
            }
        }
    }
</script>
<style lang="scss">
    .todo-list-container{
        .el-input__inner{
            height:30px;
            line-height: 30px;
        }
        .el-button--small, .el-button--small.is-round {
            padding: 7px 15px;
        }
    }

</style>
<style lang="scss" scoped>
    .todo-list-container{
        border:1px solid #ededed;
        border-bottom: none;
        header{
            display: flex;
            position: relative;
            padding: 0 10px;
            box-sizing: border-box;
            border-bottom:1px solid #ededed;
            background: rgba(0, 0, 0, 0.003);
            -webkit-box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
            box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
            .keyword{
                border: none;
                outline: none;
            }
        }
        .todo-list-wrapper{
            height:280px;
            overflow-y: auto;
        }
        .label{
            background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
            background-repeat: no-repeat;
            background-position: center left;
            background-size: 36px;
            padding: 15px 15px 15px 50px;
            transition: all .3s;
        }
        .todo-checkbox{
            opacity: 0;
            width:40px;
            height:40px;
            background: none;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto 0;
            /* Mobile Safari 去掉控件外观*/
            -webkit-appearance: none;
            appearance: none;
            &:checked + .label{
                background-size: 36px;
                background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
                color: #d9d9d9;
                text-decoration: line-through;
            }
        }

        .close-btn{
            display: none;
            position: absolute;
            top: 0;
            right: 10px;
            bottom: 0;
            width: 40px;
            height: 40px;
            margin: auto 0;
            font-size: 30px;
            color: #cc9a9a;
            transition: color 0.2s ease-out;
            cursor: pointer;
            background: none;
            border:none;
            outline: none;
            &:hover{
                color: #af5b5e;
            }
            &:after{
                content: '×';
            }
        }
        .list-item{
            position: relative;
            padding: 0 10px;
            box-sizing: border-box;
            &:not(:last-child){
                border-bottom:1px solid #ededed;
            }
            &:hover{
                .close-btn{display: block}
            }
        }
        .editing{
            display: flex;
            padding:5px 0;
            justify-content: space-between;
            .el-input{
                flex : 3;
                margin-right: 20px;
            }
            .action-wrapper{
                flex : 2
            }
        }
        footer{
            display: flex;
            position: relative;
            padding:10px 15px;
            height:40px;
            box-sizing: border-box;
            align-items: center;
            border-top:1px solid #ededed;
            color: #777;
            /*折叠效果*/
            &:before {
                content: '';
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                height: 40px;
                overflow: hidden;
                box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
            }
            .filter-wrapper{
                display: flex;
                position: relative;
                z-index: 10;//修改层级
                margin-left: 40px;
                li{
                    margin: 0 5px;
                    cursor: pointer;
                    border: 1px solid transparent;
                    border-radius: 3px;
                    padding:3px 7px;
                    &.selected,&:hover {
                        border-color: rgba(175, 47, 47, 0.2);
                    }
                }
            }
        }
    }
</style>