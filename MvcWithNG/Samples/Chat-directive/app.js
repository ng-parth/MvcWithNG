var chatAppModule = angular.module('coderDojoChat', ['ui.bootstrap']);

chatAppModule.directive('message', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            content: '=content'
        },
        controller: function ($scope, $attrs, $element) {
            var el = $compile('<div class="well well-small">' + $scope.content + '</div>')($scope);
            console.dir(el.html());
            $element.append(el);

            $scope.$watch('content', function (val) {
                if (val && val.value) {
                    $scope.cvtDesc = converter.makeHtml(val.description);
                }
                else {
                    $scope.cvtDesc = '';
                }
            });
        }
    };
});


chatAppModule.controller("chatController", function ($scope) {
    var channelName = 'chat';
    $scope.pubKey = "pub-c-f4a90e76-f06e-42b8-9594-3756a8bac175";
    $scope.name = { value: 'Guest' + (Math.floor(Math.random() * 100000)) };
    $scope.chatBackgroundColor = { value: 'background: skyblue' };
    $scope.chatMessages = [];
    $scope.messageInput = { value: '' };

    var subscriptionSetup = {
        channel: channelName,
        callback: function (newMessage) {
            $scope.$apply(function () {
                $scope.chatMessages.unshift(newMessage);
            });
        }
    };
    PUBNUB.subscribe(subscriptionSetup);

    function messageInputEmpty() {
        if ($scope.messageInput.value == null || $scope.messageInput.value == '') {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.sendMessageDisabled = function () {
        return messageInputEmpty();
    };


    $scope.sendMessage = function () {
        if (messageInputEmpty()) {
            return;
        }
        var messageToPublish = {
            channel: channelName,
            message: {
                name: $scope.name.value,
                content: $scope.messageInput.value,
                sentAtTime: new Date()
            }
        };
        PUBNUB.publish(messageToPublish);
        $scope.resetInput();
    };

    $scope.resetInputDisabled = function () {
        return messageInputEmpty();
    };

    $scope.resetInput = function () {
        $scope.messageInput.value = '';
    };

    $scope.clone = function (content) {
        $scope.messageInput.value = content;
    };
});